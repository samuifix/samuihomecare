import { defineConfig, LayoutProps, useClient } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { useEffect, useState } from "react";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity projectId. Add SANITY_STUDIO_PROJECT_ID=your_project_id to studio/.env (get it from https://manage.sanity.io → your project → API)."
  );
}

/**
 * Custom Layout component to inject GTM and GA4 scripts
 * Now fetches IDs from Sanity siteSettings
 */
function StudioLayoutWithAnalytics(props: LayoutProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [analytics, setAnalytics] = useState<{ gtmId?: string; gaId?: string }>({});

  useEffect(() => {
    // Fetch settings from Sanity
    client.fetch(`*[_type == "siteSettings"][0]{gtmId, gaId}`).then((data) => {
      if (data) {
        setAnalytics(data);
      }
    });
  }, [client]);

  useEffect(() => {
    const { gtmId, gaId } = analytics;

    // 1. Inject Google Tag Manager (GTM)
    if (gtmId && !document.getElementById("gtm-script")) {
      const gtmScript = document.createElement("script");
      gtmScript.id = "gtm-script";
      gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(gtmScript);

      const gtmNoscript = document.createElement("noscript");
      gtmNoscript.id = "gtm-noscript";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      gtmNoscript.appendChild(iframe);
      document.body.insertBefore(gtmNoscript, document.body.firstChild);
    }

    // 2. Inject Google Analytics 4 (GA4) directly
    if (gaId && !document.getElementById("ga-script")) {
      const gaScript = document.createElement("script");
      gaScript.id = "ga-script";
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      const gaInitScript = document.createElement("script");
      gaInitScript.id = "ga-init-script";
      gaInitScript.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`;
      document.head.appendChild(gaInitScript);
    }
  }, [analytics]);

  return props.renderDefault(props);
}

export default defineConfig({
  name: "samui-home-care",
  title: "Samui Construction CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      layout: StudioLayoutWithAnalytics,
    },
  },
});
