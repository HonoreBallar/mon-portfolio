import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { card } from "@/components/admin/styles";
import { findResource } from "@/lib/admin/resources";
import { requireAdmin } from "@/lib/auth";
import { saveItem } from "../../actions";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

export default async function NewItem({ params }: PageProps<"/admin/[resource]/new">) {
  await requireAdmin();
  const { resource: key } = await params;
  const resource = findResource(key);
  if (!resource) notFound();

  return (
    <div className="max-w-[760px]">
      <h1 className="text-[30px] font-bold tracking-tight text-text">Ajouter : {resource.singular}</h1>
      <div className={`${card} mt-8 p-6 sm:p-8`}>
        <ResourceForm
          fields={resource.fields}
          initial={{ visible: true, position: "0" }}
          action={saveItem.bind(null, key, null)}
          cancelHref={`/admin/${key}`}
          submitLabel="Créer"
        />
      </div>
    </div>
  );
}
