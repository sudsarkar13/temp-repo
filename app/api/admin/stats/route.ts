import { NextResponse, NextRequest } from 'next/server';
import { Project } from '@/models/Project';
import { Message } from '@/models/Message';
import Analytics from '@/models/analytics';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Check auth token from cookie
    const token = request.cookies.get('admin_token');
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get counts
    const [
      totalProjects,
      activeProjects,
      totalMessages,
      unreadMessages,
      totalViews,
      totalClicks,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Message.countDocuments(),
      Message.countDocuments({ status: 'unread' }),
      Analytics.countDocuments({ type: 'pageView' }),
      Analytics.countDocuments({ type: 'projectClick' }),
    ]);

    return NextResponse.json({
      totalProjects,
      activeProjects,
      totalMessages,
      unreadMessages,
      totalViews,
      totalClicks,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
