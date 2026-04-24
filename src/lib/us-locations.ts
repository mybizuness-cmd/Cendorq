export const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming",

    // Territories
    "Puerto Rico",
    "Guam",
    "U.S. Virgin Islands",
    "American Samoa",
    "Northern Mariana Islands"
];

// ⚠️ Keep this lightweight for now (expand later or plug API)
export const US_CITIES: Record<string, string[]> = {
    California: [
        "Los Angeles",
        "San Diego",
        "San Jose",
        "San Francisco",
        "Sacramento"
    ],
    Texas: [
        "Houston",
        "Dallas",
        "Austin",
        "San Antonio"
    ],
    Florida: [
        "Miami",
        "Orlando",
        "Tampa",
        "Jacksonville"
    ],
    "New York": [
        "New York City",
        "Buffalo",
        "Rochester",
        "Albany"
    ],
    Illinois: [
        "Chicago",
        "Aurora",
        "Naperville"
    ]
};