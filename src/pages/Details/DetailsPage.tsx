/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Eye from "../../assets/imgs/Eye.svg";
import Female from "../../assets/imgs/Gender-Female.svg";
import Male from "../../assets/imgs/Gender-Male.svg";
import Homeworld from "../../assets/imgs/Homeworld.svg";
import Movie from "../../assets/imgs/Movie.svg";
import Person from "../../assets/imgs/Person.svg";
import Starship from "../../assets/imgs/Starship.svg";
import Vehicle from "../../assets/imgs/Vehicle.svg";
import { Loading } from "../../components/Loading/Loading";
import { ApiService } from "../../services/Api";

export function DetailsPage() {
  const [specie, setSpecie] = useState<string>("");
  const [homeworld, setHomeworld] = useState<string>("");
  const [films, setFilms] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [starships, setStarships] = useState<any[]>([]);

  //Pega o personagem selecionado baseado na URL
  const urlName = useLocation().pathname.slice(15);

  const { data, isLoading } = useQuery({
    queryKey: ["people", urlName],
    queryFn: () => ApiService.getAll(urlName),
  });

  const person = data?.find(
    (person: any) => person.name === decodeURI(urlName)
  );

  useEffect(() => {
    loadData();
  }, [person]);

  const loadData = () => {
    getSpecie();
    getHomeworld();
    getFilms();
    getVehicles();
    getStarships();
  };

  const getHomeworld = async () => {
    if (person) {
      await axios.get(person.homeworld).then((response) => {
        setHomeworld(response.data.name);
      });
    }
  };

  const getSpecie = async () => {
    if (person) {
      await axios.get(person.species).then((response) => {
        setSpecie(response.data.name);
      });
    }
  };

  const getFilms = async () => {
    const promises: any = [];
    const apiFilms: any = [];

    if (person) {
      for (const film of person.films) {
        promises.push(
          await axios.get(film).then((response) => {
            apiFilms.push(
              `${response.data.title} - ${response.data.release_date}`
            );
          })
        );
      }

      Promise.all(promises).then(() => setFilms(apiFilms));
    }
  };

  const getVehicles = async () => {
    const promises: any = [];
    const apiVehicles: any = [];

    if (person) {
      for (const vehicle of person.vehicles) {
        promises.push(
          await axios.get(vehicle).then((response) => {
            apiVehicles.push(response.data.name);
          })
        );
      }

      Promise.all(promises).then(() => setVehicles(apiVehicles));
    }
  };

  const getStarships = async () => {
    const promises: any = [];
    const apiStarships: any = [];

    if (person) {
      for (const starship of person.starships) {
        promises.push(
          await axios.get(starship).then((response) => {
            apiStarships.push(response.data.name);
          })
        );
      }

      Promise.all(promises).then(() => setStarships(apiStarships));
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-[300px]">
      <Loading />
    </div>
  ) : (
    <div className="w-full md:max-w-lg lg:max-w-4xl p-2">
      {person ? (
        <div>
          <p className="text-base leading-4 text-gray-300 mb-4">
            <Link to="/" className="no-underline">
              All Cards
            </Link>{" "}
            {">"} <span>{person.name} Details</span>
          </p>

          <div className="bg-white rounded-lg pb-1">
            <div className="bg-yellow-500 rounded-tl-lg rounded-tr-lg pl-3 pt-3 pb-2">
              <p className="text-lg">{person.name}</p>
            </div>
            <div>
              <div className="flex justify-between items-center border-b-2 border-gray-300 p-2">
                <p className="flex items-center gap-1 text-sm text-center text-gray-800">
                  <img
                    src={person.gender === "male" ? Male : Female}
                    alt="icon"
                    height={20}
                    width={20}
                  />
                  {person.birth_year}
                </p>
                <p className="flex items-center gap-1 text-sm text-center text-gray-800">
                  <img src={Eye} alt="icon" height={20} width={20} />
                  {person.eye_color}
                </p>
                <p className="flex items-center gap-1 text-sm text-center text-gray-800">
                  <img src={Person} alt="icon" height={20} width={20} />
                  {specie}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-2">
                <div className="flex justify-between items-center w-full bg-gray-200 rounded-md py-1 px-2">
                  <p className="flex items-center gap-1 text-xs text-center uppercase text-gray-800 p-1">
                    <img src={Homeworld} alt="icon" height={16} width={16} />
                    HOMEWORLD
                  </p>
                  <p className="text-sm text-right text-gray-800">{homeworld}</p>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full bg-gray-200 rounded-md px-2"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xs text-center uppercase text-gray-800 p-2">
                      <div className="flex gap-1">
                        <img src={Movie} alt="icon" height={16} width={16} />
                        <p className="text-xs text-right text-gray-800">
                          FILMS
                        </p>
                      </div>
                    </AccordionTrigger>
                    {films.map((film) => (
                      <AccordionContent className="p-2">
                        {film}
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full bg-gray-200 rounded-md px-2"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xs text-center uppercase text-gray-800 p-2">
                      <div className="flex gap-1">
                        <img src={Vehicle} alt="icon" height={16} width={16} />
                        <p className="text-xs text-right text-gray-800">
                          VEHICLE
                        </p>
                      </div>
                    </AccordionTrigger>
                    {vehicles.map((vehicle) => (
                      <AccordionContent className="p-2">
                        {vehicle}
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full bg-gray-200 rounded-md px-2"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xs text-center uppercase text-gray-800 p-2">
                      <div className="flex gap-1">
                        <img src={Starship} alt="icon" height={16} width={16} />
                        <p className="text-xs text-right text-gray-800">
                          STARSHIP
                        </p>
                      </div>
                    </AccordionTrigger>
                    {starships.map((starship) => (
                      <AccordionContent className="p-2">
                        {starship}
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="load-text">
          Loading data...
          <br />
          <br />
          Or, info is not available.
        </p>
      )}
    </div>
  );
}
