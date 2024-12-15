const JWT_MOCKS = {
  OPENBANKING_PAYLOAD: {
    WITHOUT_BEREAR_TOKEN:
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMQ3pPanJEOHdOS1V4V2RFenYzUjVMU3lsUmdCVGt6Q2owWW5ndmx0WnJjIn0.eyJqdGkiOiJmN2RkMmU3NC1lZTFmLTQwNmQtOWIzZi1iZGM4Mzg2YWZhNzAiLCJleHAiOjE2MjIxNjAzOTQsIm5iZiI6MCwiaWF0IjoxNjIyMTYwMDk0LCJpc3MiOiJodHRwczovL3BheWZ1bi5xYS1hY2Nlc3MuY29tYWZpLmNvbS5hci9hdXRoL3JlYWxtcy9leHRlcm5hbC1xYS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJjZGY2MTY2Ny0zMjc0LTQzOTgtODM1NS00OGViMTg2MzQ1YWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI4NDlkZTdlZSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImQ2YjNiMzU2LWUxYzQtNGQ5Yy1hMWViLTBkMzJhZGQzNjM0ZSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHRyYW5zZmVycyBlbWFpbCBhY2NvdW50cyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4yNi42OC43OCIsImNsaWVudElkIjoiODQ5ZGU3ZWUiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjI2LjY4Ljc4In0.LJV90PRtAoDGn1OVXB6CrVqeMw1RqzdBtmC64y0GGyCxyyAEYmhczcvhaQI3oUKRZZ7NUXyyooAWU4H0OujSCVpkuYHUVWKnt-VObBHJP81TDSDGYD_5wNlzporQhcGs27y7ObqmbXEre2NlgR-j2zaBdd3JJwdThLiTzolfdO7xBaAX2Aiv0PO_-2FDZ1PCCGvJf5OIcUSfqJDUXMg6lijhbUAtNtTjG0SiHwrq2LBfOynlFOQVUtmzLQnSzM8lYjmExTZis4M-CzoBAO7Afs9R_nOKlSqjH_M3kGDFkM1MGoWaURK2nj-BxjuJP99MyyO6rVyov98ze20U9lM1-g",
    TOKEN: {
      iss: "https://payfun.qa-access.comafi.com.ar/auth/realms/external-qa-realm",
      jwt: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMQ3pPanJEOHdOS1V4V2RFenYzUjVMU3lsUmdCVGt6Q2owWW5ndmx0WnJjIn0.eyJqdGkiOiJmN2RkMmU3NC1lZTFmLTQwNmQtOWIzZi1iZGM4Mzg2YWZhNzAiLCJleHAiOjE2MjIxNjAzOTQsIm5iZiI6MCwiaWF0IjoxNjIyMTYwMDk0LCJpc3MiOiJodHRwczovL3BheWZ1bi5xYS1hY2Nlc3MuY29tYWZpLmNvbS5hci9hdXRoL3JlYWxtcy9leHRlcm5hbC1xYS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJjZGY2MTY2Ny0zMjc0LTQzOTgtODM1NS00OGViMTg2MzQ1YWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI4NDlkZTdlZSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImQ2YjNiMzU2LWUxYzQtNGQ5Yy1hMWViLTBkMzJhZGQzNjM0ZSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHRyYW5zZmVycyBlbWFpbCBhY2NvdW50cyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4yNi42OC43OCIsImNsaWVudElkIjoiODQ5ZGU3ZWUiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjI2LjY4Ljc4In0.LJV90PRtAoDGn1OVXB6CrVqeMw1RqzdBtmC64y0GGyCxyyAEYmhczcvhaQI3oUKRZZ7NUXyyooAWU4H0OujSCVpkuYHUVWKnt-VObBHJP81TDSDGYD_5wNlzporQhcGs27y7ObqmbXEre2NlgR-j2zaBdd3JJwdThLiTzolfdO7xBaAX2Aiv0PO_-2FDZ1PCCGvJf5OIcUSfqJDUXMg6lijhbUAtNtTjG0SiHwrq2LBfOynlFOQVUtmzLQnSzM8lYjmExTZis4M-CzoBAO7Afs9R_nOKlSqjH_M3kGDFkM1MGoWaURK2nj-BxjuJP99MyyO6rVyov98ze20U9lM1-g",
    },
  },
};

exports.JwtMocks = JWT_MOCKS;
