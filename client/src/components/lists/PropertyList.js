import styles from "./PropertyList.module.css";

import { useFetch } from "../../hooks/useFetch.js";

export default function PropertyList() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/hotels/countByType"
  );

  const types = [
    {
      name: "Hotels",
      type: "hotel",
      img: "https://images.unsplash.com/photo-1477120128765-a0528148fed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    },
    {
      name: "Villas",
      type: "villa",
      img: "https://images.unsplash.com/photo-1536625737227-92a1fc042e7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Resorts",
      type: "resort",
      img: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Apartments",
      type: "apartment",
      img: "https://images.unsplash.com/photo-1609949851943-ff5336d1129f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
    },
    {
      name: "Cabins",
      type: "cabin",
      img: "https://images.unsplash.com/photo-1541480551145-2370a440d585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
  ];

  return (
    <div className={styles.list}>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <>
          {types.map((item, idx) => (
            <div key={idx} className={styles.listItem}>
              <img className={styles.image} src={item.img} alt={item.type} />

              <div className={styles.listTitles}>
                <h1>{item.name}</h1>
                <h2>
                  {data?.counts
                    ? `${data.counts[item.type]} ${item.type}s`
                    : ""}
                </h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
