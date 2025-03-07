"use client";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Tabs, Tab } from "@heroui/tabs";
import { Locations } from "../_components/admin/Locations";
import { NamedLocations } from "../_components/admin/NamedLocations";
import { Breakthroughs } from "../_components/admin/Breakthroughs";
import { Clear } from "../_components/admin/Clear";

export default function Admin() {
  const { data: session, status: sessionStatus } = useSession();
  if (sessionStatus === "loading") return <div>Loading...</div>;
  if (sessionStatus === "unauthenticated")
    void signIn(undefined, { redirectTo: "/admin" });
  if (
    sessionStatus === "authenticated" &&
    session?.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  )
    return <div>Not admin</div>;

  return (
    <div className="mx-auto flex h-full min-h-dvh w-full max-w-7xl flex-col gap-4 rounded-xl p-4 shadow-md dark">
      <Tabs
        aria-label="Admin Tabs"
        defaultSelectedKey={"breakthroughs"}
        classNames={{
          tabList: "flex p-2 flex-row just0fy-between w-full",
          tab: "p-2",
        }}
      >
        <Tab title="Breakthroughs" key="breakthroughs">
          <Breakthroughs />
        </Tab>
        <Tab title="Named Locations" key="named">
          <NamedLocations />
        </Tab>
        <Tab title="Locations" key="locs">
          <Locations />
        </Tab>
        <Tab title="Clear" key="clear">
          <Clear />
        </Tab>
      </Tabs>
    </div>
  );
}
