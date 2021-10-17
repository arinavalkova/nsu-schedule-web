import axios from "axios";

export async function getGroupsFromServer() {
    return await axios.get("http://localhost:8080/api/group_num_list")
}