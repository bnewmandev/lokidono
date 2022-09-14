const getData = async () => {
	const data = await fetch("https://api.justgiving.com/dc8525b3/v1/fundraising/pages/LokiRodgers/donations", {
		headers: { "Content-type": "application/json" },
	});

	const donos = (await data.json())["donations"];
	const root = document.getElementById("root");
	donos.forEach((dono) => {
		const date = new Date(Number(dono.donationDate.match(/\d/g).join("").slice(0, -4)));

		if (Date.now() - date <= 2 * 60 * 1000) {
			const donoElem = document.createElement("div");
			const titleElem = donoElem.appendChild(document.createElement("h3"));
			const msgElem = donoElem.appendChild(document.createElement("p"));
			donoElem.appendChild(document.createElement("br"));

			donoElem.className = "dono";
			donoElem.id = dono.id;

			titleElem.innerText = `${dono.donorDisplayName} - ${Number(dono.amount).toFixed(2)} ${dono.currencyCode}`;
			msgElem.innerText = dono.message;

			root.appendChild(donoElem);
			console.log(date);
			setTimeout(() => {
				root.removeChild(donoElem);
			}, 15000);
		}
	});
};

setInterval(() => {
	console.log("running data checker");
	getData();
}, 60 * 1000);
