import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../assets/imgs/Card.svg";
import Eye from "../../assets/imgs/Eye.svg";
import Female from "../../assets/imgs/Gender-Female.svg";
import Male from "../../assets/imgs/Gender-Male.svg";
import Movie from "../../assets/imgs/Movie.svg";
import Search from "../../assets/imgs/Search.svg";
import Starship from "../../assets/imgs/Starship.svg";
import Vehicle from "../../assets/imgs/Vehicle.svg";
import { Loading } from "../../components/Loading/Loading";
import { ApiService } from "../../services/Api";
import { Info } from "./components/Info/Info";

export interface PersonProps {
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

export function HomePage() {
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");

  const { data: people, isLoading } = useQuery({
    queryKey: ["people", filter],
    queryFn: () => ApiService.getAll(filter),
  });

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setSearchParams((state) => {
      if (text === "") {
        state.delete("filter");
      } else {
        state.set("filter", text);
      }

      return state;
    });
  };

  return (
    <div className="container p-2 mb-5">
      <p className="text-base leading-4 text-gray-300 mb-1">
        All Cards {">"} <span>Select a card</span>
      </p>

      <div className="flex items-center">
        <form className="w-full" onSubmit={handleSearch}>
          <div className="flex items-center justify-end bg-white border-none rounded-md pr-2">
            <input
              type="text"
              className="w-full bg-white border-none rounded-md pl-2 text-base outline-none"
              placeholder="Search"
              onChange={(e) => setText(e.target.value)}
            />
            <img
              alt="icon"
              src={Search}
              onClick={handleSearch}
              height={16}
              width={16}
            />
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
          {people.length > 0 ? (
            people.map((person: PersonProps) => (
              <li className="list-none" key={person.name}>
                <div className="bg-white rounded-lg pb-4">
                  <div className="flex flex-col justify-between bg-yellow-500 rounded-tl-lg rounded-tr-lg pl-3 pt-3 pb-2">
                    <Link to={`/swapi/details/${person.name}`}>
                      <img alt="icon" src={Card} height={16} width={16} />
                    </Link>
                    <p className="text-xl text-gray-800">{person.name}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex w-full justify-between my-0 mx-auto px-3 py-1">
                      <p className="flex items-center gap-1 text-sm text-center text-gray-800">
                        <img
                          src={person.gender === "male" ? Male : Female}
                          alt="icon"
                          height={16}
                          width={16}
                        />
                        {person.birth_year}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-center text-gray-800">
                        <img src={Eye} alt="icon" height={20} width={20} />
                        {person.eye_color}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 px-3">
                      <Info
                        src={Movie}
                        title="FILMS"
                        value={`${person.films.length}`}
                      />
                      <Info
                        src={Vehicle}
                        title="VEHICLES"
                        value={`${person.vehicles.length}`}
                      />
                      <Info
                        src={Starship}
                        title="STARSHIPS"
                        value={`${person.starships.length}`}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="load-text">Info is not available.</p>
          )}
        </div>
      )}
    </div>
  );
}
