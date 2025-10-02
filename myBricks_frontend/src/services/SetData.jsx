export async function fetchCollection() {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    
    try {
        const response = await fetch("https://mybricks.dev/collection", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response) {
            return ({ success: false, message: "Failed to fetch collection" });
        }

        const data = await response.json();
        return ({ success: true, collectionData: data });
    } catch (error) {
        return ({ success: false, message: "Failed to fetch collection" });
    }
};

export async function fetchSet(setNumber) {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    
    try {
        const response = await fetch("http://localhost:4000/collection/" + setNumber, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response) {
            return ({ success: false, message: "Failed to fetch set" });
        }

        const data = await response.json();
        return ({ success: true, setData: data });
    } catch (error) {
        return ({ success: false, message: "Failed to fetch set" });
    }
};