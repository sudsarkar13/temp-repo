import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['pageView', 'projectView', 'projectClick', 'messageSubmit'],
    required: true,
  },
  path: String,
  projectId: mongoose.Schema.Types.ObjectId,
  messageId: mongoose.Schema.Types.ObjectId,
  metadata: {
    userAgent: String,
    ip: String,
    referrer: String,
    device: String,
    country: String,
  },
  timestamp: { type: Date, default: Date.now },
});

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export async function trackPageView(path: string, metadata: any) {
  try {
    await Analytics.create({
      type: 'pageView',
      path,
      metadata,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function trackProjectView(projectId: string, metadata: any) {
  try {
    await Analytics.create({
      type: 'projectView',
      projectId: new mongoose.Types.ObjectId(projectId),
      metadata,
    });

    // Update project analytics
    await mongoose.models.Project.findByIdAndUpdate(projectId, {
      $inc: { 'analytics.views': 1 },
      $set: { 'analytics.lastViewed': new Date() },
    });
  } catch (error) {
    console.error('Failed to track project view:', error);
  }
}

export async function trackProjectClick(projectId: string, metadata: any) {
  try {
    await Analytics.create({
      type: 'projectClick',
      projectId: new mongoose.Types.ObjectId(projectId),
      metadata,
    });

    // Update project analytics
    await mongoose.models.Project.findByIdAndUpdate(projectId, {
      $inc: { 'analytics.clicks': 1 },
    });
  } catch (error) {
    console.error('Failed to track project click:', error);
  }
}

export async function getAnalyticsSummary(startDate: Date, endDate: Date) {
  try {
    const pipeline = [
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            type: '$type',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.type',
          dailyCounts: {
            $push: {
              date: '$_id.date',
              count: '$count',
            },
          },
          totalCount: { $sum: '$count' },
        },
      },
    ];

    const results = await Analytics.aggregate(pipeline);
    return results;
  } catch (error) {
    console.error('Failed to get analytics summary:', error);
    return [];
  }
}

export async function getProjectAnalytics(projectId: string, startDate: Date, endDate: Date) {
  try {
    const views = await Analytics.countDocuments({
      type: 'projectView',
      projectId: new mongoose.Types.ObjectId(projectId),
      timestamp: { $gte: startDate, $lte: endDate },
    });

    const clicks = await Analytics.countDocuments({
      type: 'projectClick',
      projectId: new mongoose.Types.ObjectId(projectId),
      timestamp: { $gte: startDate, $lte: endDate },
    });

    const dailyViews = await Analytics.aggregate([
      {
        $match: {
          type: 'projectView',
          projectId: new mongoose.Types.ObjectId(projectId),
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return {
      totalViews: views,
      totalClicks: clicks,
      dailyViews,
      clickThroughRate: views > 0 ? (clicks / views) * 100 : 0,
    };
  } catch (error) {
    console.error('Failed to get project analytics:', error);
    return null;
  }
}
