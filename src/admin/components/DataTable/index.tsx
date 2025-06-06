import {
  Button,
  Container,
  DataTable,
  Heading,
  createDataTableColumnHelper,
  useDataTable,
} from "@medusajs/ui";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  NotificationTemplate,
  NotificationTemplateRowActions,
} from "../notification-template-row-actions";
import { sdk } from "../../utils/sdk";
import { BellAlert } from "@medusajs/icons";

const columnHelper = createDataTableColumnHelper();

const columns = [
  columnHelper.accessor("event_name", {
    header: "Event Name",
  }),
  columnHelper.accessor("template", {
    header: "Template",
    maxSize: 200,
  }),
  columnHelper.accessor("created_at", {
    header: "Created At",
  }),
  columnHelper.accessor("updated_at", {
    header: "Updated At",
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="mx-4">
          <NotificationTemplateRowActions
            notificationTemplate={row.original as NotificationTemplate}
          />
        </div>
      );
    },
  }),
];

export function DataTableComponent({}) {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/admin/notification-template`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    queryKey: ["notification-templates"],
    refetchOnMount: "always",
  });

  // Log the fetched data to verify its structure
  const notificationTemplatesArray = useMemo(() => {
    return ((data as any)?.data as any[]) || [];
  }, [(data as any)?.data]);

  const table = useDataTable({
    data: notificationTemplatesArray,
    columns: columns as unknown as any,
    rowCount: notificationTemplatesArray?.length,
    // sorting: {
    //   state: sorting,
    //   onSortingChange: setSorting,
    // },
    isLoading,
    pagination: {
      onPaginationChange: () => {},
      state: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
  });

  return (
    <Container className="p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex justify-between items-center">
          <Heading>Notification Templates</Heading>
          <Button size="small" variant="secondary" asChild>
            <Link to="create">Create</Link>
          </Button>
        </DataTable.Toolbar>
        <DataTable.Table
          emptyState={{
            empty: {
              heading: "No Data",
              description: "No Notification Templates found",
            },
          }}
        />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
}
