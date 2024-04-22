import axios from "axios";
import { ApiException } from "./ApiException";

const Api = () => {
  return axios.create({
    // baseURL: 'https://swapi.dev/api',
    baseURL: "https://swapi.py4e.com/api",
  });
};

const getAll = async (filter: string | null): Promise<any | ApiException> => {
  try {
    const url = filter !== null ? `/people/?search=${filter}` : `/people`;

    const response = await Api().get(url);
    return response.data.results;
  } catch (error) {
    return new ApiException(
      (error as ApiException).message || "Erro ao buscar os registros."
    );
  }
};

export const ApiService = {
  getAll,
};
