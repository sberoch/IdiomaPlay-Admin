import {
  CreateParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateParams,
} from "ra-core";
import api from "./axios";

export const DataProvider = {
  getList: (resource: string, params: GetListParams): any => {
    const order = `${params.sort.field}:${params.sort.order.toLowerCase()}`;
    const { page, perPage: limit } = params.pagination;
    const query = {
      order,
      page,
      limit,
      ...params.filter,
    };
    return api
      .get(`/${resource}`, { params: query })
      .then(({ headers, data }) => ({
        data: data.items,
        total: data.meta.totalItems,
      }));
  },

  getOne: (resource: string, params: GetOneParams): any => {
    return api.get(`/${resource}/${params.id}`).then(({ data }) => ({ data }));
  },

  getMany: (resource: string, params: GetManyParams): any => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return api
      .get(`/${resource}`, { params: query })
      .then(({ data }) => ({ data }));
  },

  getManyReference: (resource: string, params: GetManyReferenceParams): any => {
    const query = {
      filter: JSON.stringify({ id: params.id }),
    };
    return api
      .get(`/${resource}`, { params: query })
      .then(({ data }) => ({ data }));
  },

  update: (resource: string, params: UpdateParams): any => {
    return api
      .patch(`/${resource}/${params.id}`, params.data)
      .then(({ data }) => ({ data }));
  },

  updateMany: (resource: string, params: any): any => {
    return Promise.resolve();
  },

  create: (resource: string, params: CreateParams): any => {
    return api.post(`/${resource}`, params.data).then(({ data }) => ({ data }));
  },

  delete: (resource: string, params: DeleteParams): any => {
    return api
      .delete(`/${resource}/${params.id}`)
      .then(({ data }) => ({ data }));
  },

  deleteMany: (resource: string, params: any): any => {
    return Promise.resolve();
  },
};
