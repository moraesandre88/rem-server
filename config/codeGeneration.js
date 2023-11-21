const codeGeneration = (type, typeCount) => {
  let codeList = {
    apartamento: "AP",
    casa: "CA",
    "casa de condomínio": "CC",
    cobertura: "CO",
    flat: "FL",
    kitnet: "KI",
    terreno: "TE",
    sobrado: "SO",
    fazenda: "FA",
  };

  if (!codeList[type]) {
    console.log("Erro no tipo do imóvel");
    return;
  } else {
    const typeCode = codeList[type];
    const countDigits = typeCount.toString().length;
    if (countDigits <= 3) {
      const numberCode = ("000" + typeCount + 1).slice(-3);
      return `${typeCode}${numberCode}`;
    } else {
      console.log("Capacidade máxima de imóveis desse tipo atingida");
      return;
    }
  }
};

module.exports = codeGeneration;
