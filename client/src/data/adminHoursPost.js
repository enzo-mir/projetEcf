export default async function adminHoursPost(dataHours) {
    fetch("/adminHours", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "*",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            data: dataHours
        }),
    });
}
