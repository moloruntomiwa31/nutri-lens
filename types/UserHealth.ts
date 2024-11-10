export default interface UserHealth {
    weight: string | number;
    weightUnit: "kg" | "g";
    height: string | number;
    heightUnit: "cm" | "m";
    age: string | number;
    disease: string;
    gender: string;
}