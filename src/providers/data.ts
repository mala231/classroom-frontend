import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";
import type { DataProvider } from "@refinedev/core";

import { CreateResponse, GetOneResponse, ListResponse } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";
import { MOCK_SUBJECTS } from "@/constants/mockSubject";

let localSubjects = [...MOCK_SUBJECTS];

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const params: Record<string, string | number> = {};

      if (pagination?.mode !== "off") {
        const page = pagination?.currentPage ?? 1;
        const pageSize = pagination?.pageSize ?? 10;

        params.page = page;
        params.limit = pageSize;
      }

      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value);

        if (field === "role") {
          params.role = value;
        }

        if (resource === "departments") {
          if (field === "name" || field === "code") params.search = value;
        }

        if (resource === "users") {
          if (field === "search" || field === "name" || field === "email") {
            params.search = value;
          }
        }

        if (resource === "subjects") {
          if (field === "department") params.department = value;
          if (field === "name" || field === "code") params.search = value;
        }

        if (resource === "classes") {
          if (field === "name") params.search = value;
          if (field === "subject") params.subject = value;
          if (field === "teacher") params.teacher = value;
        }
      });

      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },

  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      const json: CreateResponse = await response.json();
      return json.data ?? {};
    },
  },

  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async (response) => {
      const json: GetOneResponse = await response.json();
      return json.data ?? {};
    },
  },
};

const { dataProvider: baseDataProvider } = createDataProvider(BACKEND_BASE_URL, options);

const dataProvider: DataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }: any) => {
    if (resource === "subjects") {
      let filteredData = [...localSubjects];

      if (filters) {
        for (const filter of filters) {
          if ("field" in filter) {
            const { field, value } = filter;
            if (field === "department" && value && value !== "all") {
              filteredData = filteredData.filter(item => item.department === value);
            }
            if (field === "name" && value) {
              const query = String(value).toLowerCase();
              filteredData = filteredData.filter(
                item =>
                  item.name.toLowerCase().includes(query) ||
                  item.code.toLowerCase().includes(query)
              );
            }
          }
        }
      }

      if (sorters && sorters.length > 0) {
        const { field, order } = sorters[0];
        filteredData.sort((a: any, b: any) => {
          const valA = a[field];
          const valB = b[field];
          if (valA < valB) return order === "asc" ? -1 : 1;
          if (valA > valB) return order === "asc" ? 1 : -1;
          return 0;
        });
      }

      const current = pagination?.current ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const total = filteredData.length;
      const paginatedData = filteredData.slice((current - 1) * pageSize, current * pageSize);

      // Add a simulated network latency
      await new Promise((resolve) => setTimeout(resolve, 200));

      return {
        data: paginatedData,
        total: total,
      } as any;
    }

    return baseDataProvider.getList({ resource, pagination, filters, sorters, meta });
  },

  getOne: async ({ resource, id, meta }: any) => {
    if (resource === "subjects") {
      const subject = localSubjects.find(item => item.id === Number(id));
      return {
        data: subject || null,
      } as any;
    }

    return baseDataProvider.getOne({ resource, id, meta });
  },

  create: async ({ resource, variables, meta }: any) => {
    if (resource === "subjects") {
      const newSubject = {
        ...variables,
        id: localSubjects.length > 0 ? Math.max(...localSubjects.map(s => s.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
      };
      localSubjects.push(newSubject as any);
      return {
        data: newSubject,
      } as any;
    }

    return baseDataProvider.create({ resource, variables, meta });
  },
};

export { dataProvider };