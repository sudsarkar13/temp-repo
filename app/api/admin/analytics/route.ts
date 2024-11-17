import { NextResponse } from 'next/server';
import { format, subDays } from 'date-fns';
import Analytics from '@/models/analytics';
import { Project } from '@/models/Project';
import { Message } from '@/models/Message';

export async function GET(request: Request) {
  try {
    // Check auth token from cookie
    const token = request.cookies.get('admin_token');
    if (!token) {
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
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: '$project',
      },
      {
        $project: {
          title: '$project.title',
          views: 1,
        },
      },
    ]);

    // Get message categories
    const messageCategories = await Message.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format data for response
    const formattedData = {
      pageViews: pageViews.map(view => ({
        date: view._id,
        views: view.count,
      })),
      projectViews: projectViews.map(project => ({
        title: project.title,
        views: project.views,
      })),
      messageCategories: messageCategories.map(category => ({
        status: category._id,
        count: category.count,
      })),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
