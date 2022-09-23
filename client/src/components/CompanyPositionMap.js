import React from "react";

function CompanyPositionMap() {
  const positions = [
    "členka představenstva",
    "členka správní rady",
    "členka výboru",
    "člen představenstva",
    "člen správní rady",
    "člen výboru",
    "ekonom",
    "ekonomka",
    "generální ředitel",
    "generální ředitelka",
    "jednatel",
    "jednatelka",
    "místopředseda",
    "místopředsedkyně",
    "místostarosta",
    "místostarostka",
    "předseda",
    "předseda představenstva",
    "předseda správní rady",
    "předsedkyně",
    "předsedkyně představenstva",
    "předsedkyně správní rady",
    "primátor",
    "primátorka",
    "prokurista",
    "prokuristka",
    "ředitel",
    "ředitelka",
    "společník",
    "starosta",
    "starostka",
    "statutární ředitel",
    "statutární ředitelka",
    "účetní",
    "zástupce",
    "zástupkyně",
    "zplnomocněná",
    "zplnomocněný",
  ];

  return positions.map((position) => {
    return (
      <option key={position} name="position" value={position}>
        {position}
      </option>
    );
  });
}

export default CompanyPositionMap;
