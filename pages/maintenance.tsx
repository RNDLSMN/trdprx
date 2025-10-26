import React from "react";
import { GetServerSideProps } from "next";
import { commomSettings } from "service/landing-page";
import useTranslation from "next-translate/useTranslation";
import { isApiLocalhost } from "helpers/functions";
import { STATUS_INACTIVE } from "helpers/core-constants";
interface MaintenanceProps {
  data: any;
}

const Maintenance: React.FC<MaintenanceProps> = ({ data }) => {
  const { t } = useTranslation("common");

  const maintenanceModeStyle: React.CSSProperties = {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    zIndex: -1,
  };

  const maintenanceModeBeforeStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    content: '""',
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.6,
    zIndex: 0,
  };

  const maintenanceContentStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-primary-color)!important",
    justifyItems: "center",
    zIndex: 999999,
    height: "100vh",
    textAlign: "center",
    maxWidth: "50%",
    margin: "0 auto",
    position: "relative",
  };

  const maintenanceContentH2Style: React.CSSProperties = {
    fontSize: "52px",
    color: "var(--text-primary-color)!important",
    marginBottom: "15px",
  };

  const maintenanceContentPStyle: React.CSSProperties = {
    fontSize: "20px",
    color: "var(--text-primary-color)!important",
    whiteSpace: "pre-line",
    lineHeight: "1.6",
  };

  return (
    <div
      className="maintenance-mode"
      style={{
        ...maintenanceModeStyle,
        background: `${
          data?.data?.maintenance_mode_img
            ? `url(${data?.data?.maintenance_mode_img})`
            : "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="maintenance-mode-before"
        style={maintenanceModeBeforeStyle}
      ></div>
      <div className="maintenance-content" style={maintenanceContentStyle}>
        <div>
          <h2 style={maintenanceContentH2Style}>
            {data?.data?.maintenance_mode_title
              ? data?.data?.maintenance_mode_title
              : t(
                  "Tradexpro Exchange is temporarily unavailable due to maintenance"
                )}
          </h2>
          <p style={maintenanceContentPStyle}>
            {data?.data?.maintenance_mode_text
              ? data?.data?.maintenance_mode_text
              : "We are working hard to make it the best friendly exchange website. Please check back later. We apologize for any inconvenience"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  try {
    // If environment variables are not set, show setup message
    if (!process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL === "undefined") {
      return {
        props: {
          data: {
            data: {
              maintenance_mode_title: "⚙️ Konfigurasi Diperlukan",
              maintenance_mode_text: 
                "Aplikasi ini memerlukan konfigurasi environment variables di Vercel.\n\n" +
                "Silakan tambahkan variabel berikut di Vercel Dashboard:\n" +
                "1. NEXT_PUBLIC_BASE_URL → URL backend API Anda\n" +
                "2. NEXT_PUBLIC_SECRET_KEY → API secret key\n" +
                "3. NEXT_PUBLIC_HOST_SOCKET → Host WebSocket\n" +
                "4. NEXT_PUBLIC_WSS_PORT → Port WebSocket\n\n" +
                "Lihat file ENV_SETUP.md atau VERCEL_SETUP.md untuk panduan lengkap.\n\n" +
                "Hubungi administrator jika Anda memerlukan bantuan.",
              maintenance_mode_status: "1",
            }
          },
        },
      };
    }

    const { data } = await commomSettings();
    if (parseInt(data?.maintenance_mode_status) == STATUS_INACTIVE && !isApiLocalhost()) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { data },
    };
  } catch (error) {
    // Show error message if API call fails
    return {
      props: {
        data: {
          data: {
            maintenance_mode_title: "🔧 Backend Sedang Dalam Proses Setup",
            maintenance_mode_text:
              "Backend API belum tersedia atau sedang dalam proses konfigurasi.\n\n" +
              "Kemungkinan penyebab:\n" +
              "1. Backend Laravel belum di-deploy ke server\n" +
              "2. API endpoints belum tersedia di: " + (process.env.NEXT_PUBLIC_BASE_URL || "undefined") + "\n" +
              "3. Database belum dikonfigurasi dengan benar\n" +
              "4. Environment variables di Vercel perlu diperbarui\n\n" +
              "Langkah yang perlu dilakukan:\n" +
              "• Deploy backend Laravel ke hosting\n" +
              "• Pastikan database MySQL sudah dikonfigurasi\n" +
              "• Verifikasi API dapat diakses melalui browser\n" +
              "• Update environment variables di Vercel jika perlu\n\n" +
              "Silakan hubungi administrator untuk bantuan lebih lanjut.",
            maintenance_mode_status: "1",
          }
        },
      },
    };
  }
};

export default Maintenance;
