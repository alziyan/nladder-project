import Head from "next/head";
import { Playfair_Display } from "next/font/google";
import styles from "@/styles.module.css";
import Select, { ActionMeta } from "react-select";
import "reset-css";
import placeholder from "../images/placeholder.webp";
import Image from "next/image";
import { ReactPropTypes, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import Link from "next/link";
type selected = {
  value: string;
  label: string;
};
type profile = {
  country: string
  logo: string
  name: string
}
type quote = {
  current: number,
  high: number,
  low: number,
  open: number,
  close: number,
}
const play = Playfair_Display({ subsets: ["latin"] });
const ProfileComponent = ({profile,selectedOptions,quote}: {profile:profile,selectedOptions: string, quote:quote}) => {
  function addToFavorites() {
    const favorites = localStorage.getItem("favorite");
    if (!favorites) {
      const favorite = {
        items: [selectedOptions],
      };
      localStorage.setItem("favorite", JSON.stringify(favorite));
    } else {
      if (profile) {
        const items = JSON.parse(favorites);
        const newItems = { items: [...items.items, selectedOptions] };

        localStorage.setItem("favorite", JSON.stringify(newItems));
      }
    }
  }
  return (
    <div className="mt-16">
      <div className="flex">
        <Image
          src={profile.logo ? profile.logo : placeholder}
          width={200}
          height={200}
          alt="companypic"
        />
        <div className="ml-12">
          <span className={`text-3xl block ${play.className}`}>
            {profile ? profile.name : ""}
          </span>
          <span className="block mt-1 text-4xl ">{quote.current}</span>
          <button
            className="mt-5 bg-green-300 p-2 rounded-md hover:bg-green-400 transition-all  "
            onClick={addToFavorites}
          >
            Add to Favourites
          </button>
        </div>
      </div>
      <div>
        <span className="mt-20 block text-center text-2xl ">Summary</span>
        <div className="mt-2 h-0.5 color bg-black m-auto"></div>
        <div className="grid grid-cols-2 mt-3">
          <div className="bg-gray-400 h-28 m-3 rounded-lg p-5">
            <span className="text-xl block">High Price</span>
            <span className="text-3xl">${quote.high}</span>
          </div>
          <div className="bg-gray-400 h-28 m-3 rounded-lg p-5">
            <span className="text-xl block">Opening</span>
            <span className="text-3xl">${quote.open}</span>
          </div>
          <div className="bg-gray-400 h-28 m-3 rounded-lg p-5">
            <span className="text-xl block">Low Price</span>
            <span className="text-3xl">${quote.low}</span>
          </div>
          <div className="bg-gray-400 h-28 m-3 rounded-lg p-5">
            <span className="text-xl block">Closing</span>
            <span className="text-3xl">${quote.close}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Home() {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [quote, setQuote] = useState({
    current: 0,
    high: 0,
    low: 0,
    open: 0,
    close: 0,
  });
  const [profile, setProfile] = useState<{
    country: string;
    logo: string;
    symbol: string;
    name: string;
  } | null>(null);

  function selectHandler(
    option: selected | null,
    actionMeta: ActionMeta<selected>
  ) {
    if (option) {
      setSelectedOptions(option.value);
      getCompanyProfile(option.value);
      getQuote(option.value);
    }
  }
  async function getCompanyProfile(selectedOptions: string) {
    const queryParams = new URLSearchParams({
      symbol: selectedOptions,
    });
    const res = await fetch(`/api/profile?${queryParams}`);
    if (res.ok) {
      const jsonData = await res.json();
      setProfile(jsonData);
    }
  }
  async function getQuote(selectedOptions: string) {
    const queryParams = new URLSearchParams({
      symbol: selectedOptions,
    });
    const res = await fetch(`/api/quote?${queryParams}`);
    if (res.ok) {
      const jsonData = await res.json();
      const { c, h, l, o, pc } = jsonData;
      setQuote({ current: c, high: h, low: l, open: o, close: pc });
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/symbols`;

        const response = await fetch(url);

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.symbols);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <Head>
        <title>Stock Price App</title>
        <meta name="description" content="get stock price" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="absolute right-10 top-10">
          <Link href="/favorites">
            <MdFavorite style={{ fontSize: "2.5em", color: "#f43f5e" }} />
          </Link>
        </div>
        <div className="max-w-xl m-auto">
          <div className="mt-8">
            <Select
              options={data}
              onChange={selectHandler}
              placeholder={"Search"}
            />
          </div>
          {profile ? <ProfileComponent profile={profile} selectedOptions={selectedOptions} quote={quote}/> : ""}
        </div>
      </main>
    </>
  );
}
