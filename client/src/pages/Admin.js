import React, { useEffect, useState } from "react";
import fetching from "../data/fetchAdminLogs";

function Admin() {
  const [query, setQuery] = useState(null);
  let q = query == null ? {} : query;
  // eslint-disable-next-line no-unused-expressions, no-self-compare
  query !== null ? console.log(Object.values(q)) : null;
  return (
    <>
      <div>
        <h1>Admin</h1>
        <button onClick={() => setQuery(fetching("ok"))}>ok</button>
      </div>
    </>
  );
}

export default Admin;
