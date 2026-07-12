import { cache } from "react";

import { db } from "@/lib/db";

export interface PublicSettings {
  whatsapp: string;
  lineId: string;
  phone: string;
  email: string;
  facebookPage: string;
  location: string;
  tripadvisor: string;
}

export const DEFAULT_SETTINGS: PublicSettings = {
  whatsapp: "+669374777528",
  lineId: "noodang002428",
  phone: "0937477528",
  email: "timetaxikhaolak@gmail.com",
  facebookPage: "nongluck dongluck",
  location: "Khao Lak, Phang Nga, Thailand",
  tripadvisor: "",
};

async function loadSettings(): Promise<PublicSettings> {
  try {
    const rows = await db.setting.findMany();
    const values = Object.fromEntries(rows.map((row) => [row.key, row.value]));

    return {
      whatsapp: values.whatsapp_number ?? DEFAULT_SETTINGS.whatsapp,
      lineId: values.line_id ?? DEFAULT_SETTINGS.lineId,
      phone: values.phone ?? DEFAULT_SETTINGS.phone,
      email: values.email ?? DEFAULT_SETTINGS.email,
      facebookPage: values.facebook_page ?? DEFAULT_SETTINGS.facebookPage,
      location: values.location ?? DEFAULT_SETTINGS.location,
      tripadvisor: values.tripadvisor_url ?? DEFAULT_SETTINGS.tripadvisor,
    };
  } catch (error) {
    console.error("Unable to load public settings; using safe defaults", error);
    return DEFAULT_SETTINGS;
  }
}

export const getSettings = cache(loadSettings);
