import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Project from '@/models/project';
import Message from '@/models/message';
import { Analytics } from '@/lib/analytics';

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token?.sub) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get project stats
    const [totalProjects, activeProjects] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ state: 'published' }),
    ]);

    // Get message stats
    const [totalMessages, unreadMessages] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ status: 'new' }),
    ]);

    // Get analytics stats
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    const analytics = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalViews = analytics.find(a => a._id === 'pageView')?.count || 0;
    const totalClicks = analytics.find(a => a._id === 'projectClick')?.count || 0;

    return NextResponse.json({
      totalProjects,
      activeProjects,
      totalMessages,
      unreadMessages,
      totalViews,
      totalClicks,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
