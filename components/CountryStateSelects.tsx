"use client";

import { useMemo } from "react";
import { Country, State } from "country-state-city";

const selectClass =
  "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-gold";

type Props = {
  countryCode: string;
  stateName: string;
  onCountryChange: (iso2: string) => void;
  onStateChange: (name: string) => void;
  countryError?: string;
  stateError?: string;
};

export default function CountryStateSelects({
  countryCode,
  stateName,
  onCountryChange,
  onStateChange,
  countryError,
  stateError,
}: Props) {
  const countries = useMemo(
    () =>
      Country.getAllCountries().sort((a, b) =>
        a.name.localeCompare(b.name, "en"),
      ),
    [],
  );

  const states = useMemo(
    () =>
      countryCode
        ? State.getStatesOfCountry(countryCode).sort((a, b) =>
            a.name.localeCompare(b.name, "en"),
          )
        : [],
    [countryCode],
  );

  return (
    <>
      <div>
        <label htmlFor="checkout-country" className="text-xs text-muted">
          Country *
        </label>
        <select
          id="checkout-country"
          required
          value={countryCode}
          onChange={(e) => {
            onCountryChange(e.target.value);
            onStateChange("");
          }}
          className={selectClass}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>
        {countryError && (
          <p className="mt-1 text-xs text-danger">{countryError}</p>
        )}
      </div>

      {countryCode && states.length > 0 ? (
        <div>
          <label htmlFor="checkout-state" className="text-xs text-muted">
            State / province *
          </label>
          <select
            id="checkout-state"
            required
            value={
              states.some((s) => s.name === stateName) ? stateName : ""
            }
            onChange={(e) => onStateChange(e.target.value)}
            className={selectClass}
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {stateError && (
            <p className="mt-1 text-xs text-danger">{stateError}</p>
          )}
        </div>
      ) : countryCode && states.length === 0 ? (
        <div>
          <label htmlFor="checkout-region" className="text-xs text-muted">
            Region / province (optional)
          </label>
          <input
            id="checkout-region"
            value={stateName}
            onChange={(e) => onStateChange(e.target.value)}
            placeholder="If applicable"
            className={selectClass}
          />
        </div>
      ) : null}
    </>
  );
}

/** Resolve ISO2 from stored country (ISO2 or legacy full name). */
export function resolveCountryIso(stored: string | undefined): string {
  if (!stored?.trim()) return "";
  const t = stored.trim();
  if (t.length === 2) {
    const byCode = Country.getCountryByCode(t.toUpperCase());
    return byCode?.isoCode ?? "";
  }
  const byName = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === t.toLowerCase(),
  );
  return byName?.isoCode ?? "";
}
