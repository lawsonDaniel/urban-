import React from "react";
import NotificationCard from "../components/notification-card";
import SubHeader from "../components/headers/sub-header";

export default function Notification() {
  return (
    <>
      <SubHeader header="Notifications" hideBack />
      <div className="mt-8 grid grid-col-1 gap-y-4">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </>
  );
}
