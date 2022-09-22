/**
     * This function takes in three parameters, type, message, and image, and then displays a popup
     * alert with the given parameters.
     * @param type - The type of alert you want to display.
     * @param message - The message you want to display in the popup
     * @param image - The image to be displayed in the popup.
     */
    
 export const popUpAlert = (type, message, image) => {
    Swal.fire({
            icon: `${image}`,
            title: `${type}`,
            text: `${message}`,
            background: "#1d204b",
            color: "#FFF",
            customClass: { popup: "swal2-border-radius" }
        } 
    );
}