import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ClassDetails } from "@/types";
import { useMemo } from "react";

const ClassesList = () => {
    const columns = useMemo<ColumnDef<ClassDetails>[]>(() => [
        {
            id: 'name',
            accessorKey: 'name',
            size: 250,
            header: () => <p className="column-title ml-2">Class Name</p>,
            cell: ({ getValue }) => <span className="text-foreground font-medium ml-2">{getValue<string>()}</span>
        },
        {
            id: 'subject',
            accessorKey: 'subject.name',
            size: 150,
            header: () => <p className="column-title">Subject</p>,
            cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        },
        {
            id: 'teacher',
            accessorKey: 'teacher.name',
            size: 150,
            header: () => <p className="column-title">Teacher</p>,
            cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        },
        {
            id: 'capacity',
            accessorKey: 'capacity',
            size: 100,
            header: () => <p className="column-title">Capacity</p>,
            cell: ({ getValue }) => <span className="text-foreground">{getValue<number>()}</span>,
        },
        {
            id: 'status',
            accessorKey: 'status',
            size: 100,
            header: () => <p className="column-title">Status</p>,
            cell: ({ getValue }) => {
                const status = getValue<string>();
                return (
                    <Badge variant={status === "active" ? "default" : "secondary"}>
                        {status}
                    </Badge>
                );
            }
        }
    ], []);

    const classTable = useTable<ClassDetails>({
        columns,
        refineCoreProps: {
            resource: 'classes',
            pagination: { pageSize: 10, mode: 'server' },
            sorters: {
                initial: [
                    {
                        field: 'id',
                        order: 'desc'
                    }
                ]
            }
        }
    });

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Classes</h1>
            <div className="intro-row">
                <p>Quick access to essential metrics and management tools.</p>
                <div className="actions-row">
                    <CreateButton resource="classes" />
                </div>
            </div>
            <DataTable table={classTable} />
        </ListView>
    );
};

export default ClassesList;