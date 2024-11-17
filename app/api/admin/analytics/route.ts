import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { format, subDays } from 'date-fns';
import { Analytics } from '@/lib/analytics';
import Project from '@/models/project';
import Message from '@/models/message';

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token?.sub) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const endDate = new Date();
    const startDate = subDays(endDate, 30); // Last 30 days

    // Get daily page views
    const pageViews = await Analytics.aggregate([
      {
        $match: {
          type: 'pageView',
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

    // Get project views distribution
    const projectViews = await Analytics.aggregate([
      {
        $match: {
          type: 'projectView',
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$projectId',
          views: { $sum: 1 },
        },
      },
    ]);

    // Get project details for the views
    const projects = await Project.find({
      _id: { $in: projectViews.map(pv => pv._id) },
    }, 'title');

    const projectViewsData = projectViews.map(pv => ({
      name: projects.find(p => p._id.toString() === pv._id.toString())?.title || 'Unknown',
      views: pv.views,
    }));

    // Get message categories distribution
    const messageCategories = await Message.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate engagement metrics
    const [totalViews, totalClicks] = await Promise.all([
      Analytics.countDocuments({
        type: 'pageView',
        timestamp: { $gte: startDate, $lte: endDate },
      }),
      Analytics.countDocuments({
        type: 'projectClick',
        timestamp: { $gte: startDate, $lte: endDate },
      }),
    ]);

    // Calculate average time on site (assuming you're tracking this)
    const avgTimeOnSite = 5; // Placeholder - implement actual calculation

    const chartData = {
      pageViews: pageViews.map(pv => ({
        date: pv._id,
        count: pv.count,
      })),
      projectViews: projectViewsData,
      messageCategories: messageCategories.map(mc => ({
        category: mc._id,
        count: mc.count,
      })),
      engagementMetrics: {
        clickThroughRate: totalViews > 0 ? (totalClicks / totalViews) * 100 : 0,
        averageTimeOnSite: avgTimeOnSite,
        bounceRate: 45, // Placeholder - implement actual calculation
      },
    };

    return NextResponse.json({ chartData });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
