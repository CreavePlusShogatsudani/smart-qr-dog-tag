'use server';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      notify_qr_scans: true,
      notify_emergency_alerts: true,
      notify_location_updates: true,
      notify_messages: true,
      emergency_auto_notify: true,
      emergency_share_location: true,
    }
  });

  return user;
}

export async function saveSettings(data: {
  notify_qr_scans?: boolean;
  notify_emergency_alerts?: boolean;
  notify_location_updates?: boolean;
  notify_messages?: boolean;
  emergency_auto_notify?: boolean;
  emergency_share_location?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data,
  });

  revalidatePath('/settings');
  return { success: true };
}
