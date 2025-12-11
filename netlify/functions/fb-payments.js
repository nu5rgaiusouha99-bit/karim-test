exports.handler = async (event, context) => {
  const VERIFY_TOKEN = "mySecret123";  // ضع نفس التوكِن الذي ستكتبه في فيسبوك

  // STEP 1 — VERIFY TOKEN (Facebook sends a GET request)
  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters;

    if (params["hub.verify_token"] === VERIFY_TOKEN) {
      return {
        statusCode: 200,
        body: params["hub.challenge"]
      };
    }

    return {
      statusCode: 403,
      body: "Verification token mismatch"
    };
  }

  // STEP 2 — HANDLE PAYMENT EVENTS (Facebook sends POST)
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body || "{}");

      console.log("PAYMENT EVENT RECEIVED:", JSON.stringify(data, null, 2));

      return {
        statusCode: 200,
        body: "OK"
      };

    } catch (err) {
      console.error("Webhook Error:", err);
      return {
        statusCode: 500,
        body: "Internal Server Error"
      };
    }
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
};
