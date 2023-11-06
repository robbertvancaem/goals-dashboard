import { ASANA_BASE_URL, ASANA_PAT } from "../../constants";

const auth = {
  headers: {
    Authorization: `Bearer ${ASANA_PAT}`,
  },
};

export const getTasksFromSection = async (gid) => {
  const url = `${ASANA_BASE_URL}/sections/${gid}/tasks?opt_fields=custom_fields,created_at,resource_type,gid,created_at,name&limit=100`;
  const res = await fetch(url, auth);
  const data = await res.json();
  return data.data;
};
