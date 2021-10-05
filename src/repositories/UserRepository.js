import HTTP from "@/common/http";

const resource = "users";
// función para hacer las llamadas lentas a propósito
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    return response.data;
  },
  async findOne(id) {
    await sleep(1000);
    return (await HTTP.get(`${resource}/${id}`)).data;
  },
  async delete(id) {
    await sleep(1000);
    return await HTTP.delete(`${resource}/${id}`);
  },
  async activate(id) {
    await sleep(1000);
    return await HTTP.put(`${resource}/${id}/activate`);
  },
  async deactivate(id) {
    await sleep(1000);
    return await HTTP.put(`${resource}/${id}/deactivate`);
  },
};
