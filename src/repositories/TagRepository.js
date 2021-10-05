import HTTP from "@/common/http";

const resource = "tags";

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

  async save(tag) {
    await sleep(1000);
    if (tag.id) {
      return (await HTTP.put(`${resource}/${tag.id}`, tag)).data;
    } else {
      return (await HTTP.post(`${resource}`, tag)).data;
    }
  },

  async delete(id) {
    await sleep(1000);
    return await HTTP.delete(`${resource}/${id}`);
  },
};
