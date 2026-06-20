export const prettifyAccessibilityRating = (value: string) => {
    switch(value) {
        case "fully_accessible": return "Fully accessible"; break;
        case "mostly_accessible": return "Mostly accessible"; break;
        case "playable": return "Playable"; break;
        case "partially_accessible": return "Partially accessible"; break;
        case "unknown": return "Unknown"; break;
    }
}
