import { Button, Container, Heading, Text } from "@medusajs/ui";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useEffect, useState, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HttpTypes } from "@medusajs/types";
import { _DataTable } from "../../../../table/data-table";
import { NotificationTemplateRowActions } from "./notification-template-row-actions";
import { useProductTypeTableFilters } from "../../../../../hooks/table/filters/use-product-type-table-filters";
import { useProductTypeTableQuery } from "../../../../../hooks/table/query/use-product-type-table-query";
import { useDataTable } from "../../../../../hooks/use-data-table";
import { TextCell } from "../../../../common/text-cell";
import { DateCell } from "../../../../common/date-cell";

const PAGE_SIZE = 20;

const fetchNotifcation = async (
  searchParams: HttpTypes.AdminProductTypeListParams
) => {
  try {
    const queryString = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        if (typeof value === "object" && value !== null) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedValue !== undefined) {
              queryString.append(`${key}[${nestedKey}]`, nestedValue as string);
            }
          }
        } else {
          queryString.append(key, value);
        }
      }
    }

    const response = await fetch(`/admin/notification-template`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "Failed to fetch Notification");
    }
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export type Event = {
  id?: string;
  name?: string;
  tags?: Record<string, any>;
};

// Define a type for the brand data
export interface NotificationTemplate {
  id?: string;

  template?: string;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;

  event_name: string;
}

export const NotificationTemplateListTable = () => {
  const { t } = useTranslation();
  const { searchParams, raw } = useProductTypeTableQuery({
    pageSize: PAGE_SIZE,
  });
  const filters = useProductTypeTableFilters();

  const [notificationTemplate, setNotificationTemplate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState(0);
  const columns = useColumns();
  const [prevSearchParams, setPrevSearchParams] = useState(null);
  useEffect(() => {
    const loadBrands = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const fetchedNotification = await fetchNotifcation(searchParams);

        setNotificationTemplate(fetchedNotification.data);
        setCount(fetchedNotification.data.length);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      JSON.stringify(prevSearchParams) !== JSON.stringify(searchParams) ||
      prevSearchParams == null
    ) {
      loadBrands();
      setPrevSearchParams(searchParams as SetStateAction<null>); // Update previous searchParams
    }
  }, [searchParams]);

  const { table } = useDataTable<NotificationTemplate>({
    columns,
    data: notificationTemplate,
    count,
    pageSize: PAGE_SIZE,
  });

  if (isError) {
    return <div>Error loading notification. Please try again later.</div>; // Show error message
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading>{"Notification Template List"}</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            {"Organize your notification template"}
          </Text>
        </div>
        <Button size="small" variant="secondary" asChild>
          <Link to="create">Create</Link>
        </Button>
      </div>
      <_DataTable
        table={table}
        filters={filters}
        isLoading={isLoading}
        columns={columns}
        pageSize={PAGE_SIZE}
        count={count}
        queryObject={raw}
        orderBy={[
          { key: "created_at", label: "Created" },
          { key: "updated_at", label: "Updated" },
        ]}
        pagination
        search
      />
    </Container>
  );
};

const useColumns = () => {
  const { t } = useTranslation();
  return useMemo<ColumnDef<NotificationTemplate>[]>(
    () => [
      {
        accessorKey: "event_name",
        header: () => "event name",
        cell: ({ getValue }) => <TextCell text={getValue() as string} />,
      },
      {
        accessorKey: "template",
        header: () => "Template",
        cell: ({ getValue }) => <TextCell text={getValue() as string} />,
      },
      {
        accessorKey: "created_at",
        header: () => "Created",
        cell: ({ getValue }) => {
          const dateValue = getValue() as string;
          return <DateCell date={new Date(dateValue)} />;
        },
      },
      {
        accessorKey: "updated_at",
        header: () => "Updated",
        cell: ({ getValue }) => {
          const dateValue = getValue() as string;
          return <DateCell date={new Date(dateValue)} />;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <>
              <NotificationTemplateRowActions
                notificationTemplate={row.original}
              />
            </>
          );
        },
      },
    ],
    [t]
  );
};
