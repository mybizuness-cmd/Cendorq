"use client";

import { US_CITIES, US_STATES } from "@/lib/us-locations";

type LocationValue = {
  country: string;
  state: string;
  city: string;
};

type LocationSelectorProps = {
  value: LocationValue;
  onChange: (value: LocationValue) => void;
  required?: boolean;
};

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Mexico",
  "Brazil",
  "India",
  "Japan",
  "Singapore",
  "United Arab Emirates",
  "South Africa",
  "Other",
];

export function LocationSelector({
  value,
  onChange,
  required = true,
}: LocationSelectorProps) {
  const isUnitedStates = value.country === "United States";
  const cityOptions = isUnitedStates && value.state ? US_CITIES[value.state] ?? [] : [];

  function updateField<K extends keyof LocationValue>(key: K, next: LocationValue[K]) {
    const nextValue: LocationValue = {
      ...value,
      [key]: next,
    };

    if (key === "country") {
      nextValue.state = "";
      nextValue.city = "";
    }

    if (key === "state") {
      nextValue.city = "";
    }

    onChange(nextValue);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Country
        </label>
        <select
          value={value.country}
          onChange={(e) => updateField("country", e.target.value)}
          required={required}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
        >
          <option value="">Select country</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          Choose the country where the business primarily operates.
        </p>
      </div>

      {isUnitedStates ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              State or territory
            </label>
            <select
              value={value.state}
              onChange={(e) => updateField("state", e.target.value)}
              required={required}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
            >
              <option value="">Select state or territory</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              We use this to narrow the location context and improve accuracy.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              City
            </label>
            {cityOptions.length > 0 ? (
              <select
                value={value.city}
                onChange={(e) => updateField("city", e.target.value)}
                required={required}
                disabled={!value.state}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
              >
                <option value="">
                  {value.state ? "Select city" : "Choose state first"}
                </option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={value.city}
                onChange={(e) => updateField("city", e.target.value)}
                required={required}
                placeholder={value.state ? "Enter city" : "Choose state first"}
                disabled={!value.state}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
              />
            )}
            <p className="mt-2 text-xs leading-6 text-slate-500">
              If your city is not listed, type it manually after choosing the state.
            </p>
          </div>
        </div>
      ) : value.country ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              State, region, or province
            </label>
            <input
              value={value.state}
              onChange={(e) => updateField("state", e.target.value)}
              required={required}
              placeholder="Example: Ontario, England, Bavaria"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
            />
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Use the main state, province, or region tied to the business.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              City
            </label>
            <input
              value={value.city}
              onChange={(e) => updateField("city", e.target.value)}
              required={required}
              placeholder="Enter city"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
            />
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Enter the primary city where the business is based or primarily serves.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}