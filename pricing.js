function calculatePrice() {

    const areaType = document.getElementById("areaType").value;
    const distance = Number(document.getElementById("distance").value);

    const errorMessage = document.getElementById("errorMessage");
    const result = document.getElementById("result");

    // Hide previous result
    errorMessage.style.display = "none";
    result.style.display = "none";


    // ================= CHECK AREA =================

    if (areaType === "") {

        showError("Please select your area type.");

        return;
    }


    // ================= CHECK DISTANCE =================

    if (!distance || distance <= 0) {

        showError("Please enter moving distance in KM.");

        return;
    }


    // ================= ITEM PRICE =================

    const items = document.querySelectorAll(".item-qty");

    let itemsPrice = 0;
    let totalItems = 0;

    items.forEach(function(item) {

        const quantity = Number(item.value) || 0;

        const price = Number(item.dataset.price);

        totalItems += quantity;

        itemsPrice += quantity * price;

    });


    // ================= CHECK ITEMS =================

    if (totalItems === 0) {

        showError(
            "Please enter quantity of at least one item."
        );

        return;
    }


    // ================= TRAVEL PRICE =================

    let travelPrice = 0;


    // POPULATION AREA

    if (areaType === "population") {

        // First 5 KM = ₹1399

        if (distance <= 5) {

            travelPrice = 1399;

        } else {

            const extraKm = distance - 5;

            travelPrice = 1399 + (extraKm * 100);

        }

    }


    // NORMAL AREA

    else if (areaType === "normal") {

        // First 5 KM = ₹999

        if (distance <= 5) {

            travelPrice = 999;

        } else {

            const extraKm = distance - 5;

            travelPrice = 999 + (extraKm * 100);

        }

    }


    // ================= FINAL TOTAL =================

    const totalPrice = travelPrice + itemsPrice;


    // ================= SHOW OUTPUT =================

    document.getElementById("travelPrice").innerText =
        "₹" + travelPrice.toLocaleString("en-IN");


    document.getElementById("itemsPrice").innerText =
        "₹" + itemsPrice.toLocaleString("en-IN");


    document.getElementById("totalPrice").innerText =
        "₹" + totalPrice.toLocaleString("en-IN");


    // Show result box

    result.style.display = "block";


    // Automatically move screen to result

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* ================= ERROR ================= */

function showError(message) {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.innerText = message;

    errorMessage.style.display = "block";

}