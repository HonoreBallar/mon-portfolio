import ResourceForm from "@/components/admin/ResourceForm";
import { card } from "@/components/admin/styles";
import { getDb, tables } from "@/db";
import { SETTINGS_FIELDS } from "@/lib/admin/resources";
import { requireAdmin } from "@/lib/auth";
import { saveSettings } from "../actions";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

export default async function Settings() {
  await requireAdmin();
  const [settings] = await getDb().select().from(tables.siteSettings).limit(1);

  return (
    <div className="w-full">
      <h1 className="text-[30px] font-bold tracking-tight text-text">Réglages</h1>
      <div className={`${card} mt-8 p-6 sm:p-8`}>
        <ResourceForm
          fields={SETTINGS_FIELDS}
          initial={{
            contactEmail: settings?.contactEmail ?? "",
            roles: settings?.roles.join(", ") ?? "",
            rolesEn: settings?.rolesEn?.join(", ") ?? "",
          }}
          action={saveSettings}
        />
      </div>
    </div>
  );
}
