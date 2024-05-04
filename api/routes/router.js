import express from "express";
import session from "express-session";
import flash from "connect-flash";
import he from "he";
import crypto from "crypto";
import salesController from "../controllers/sales.controller.js";
import rateLimit from "express-rate-limit";
import usersController from "../controllers/users.controller.js";
import formatPriceAsTZS from "../middlewares/formatCurrency.js";
import formatDate from "../middlewares/currentDate.js";
import PasswordHandler from "../controllers/password.controller.js";
import businessController from "../controllers/business.controller.js";

// Set up rate limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});

function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

const router = express.Router();
//middleware configuration
router.use(express.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(flash());
router.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
router.use(
  session({
    secret: "sessionkey-secret",
    resave: false,
    saveUninitialized: true,
  })
);
router.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
function requireLogin(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    // Store the original request URL in the session
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login"); // Assuming you have a /login route for login
  }
}

const navLinks = {
  index: [
    { page: "/login", text: "LOGIN", icon: "bx-user" },
    { page: "/signUp", text: "SIGN UP", icon: "bx-user-plus" },
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/search", text: "HISTORY", icon: "bx-history" },
  ],
  home: [
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/search", text: "HISTORY", icon: "bx-history" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
  ],
  dashboard: [
    { page: "/", text: "HOME", icon: "bx-home" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/search", text: "HISTORY", icon: "bx-history" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
    // Add more links as needed
  ],
  sales: [
    { page: "/", text: "HOME", icon: "bx-home" },
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/search", text: "HISTORY", icon: "bx-history" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
  ],
  inventory: [
    { page: "/", text: "HOME", icon: "bx-home" },
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/search", text: "SEARCH", icon: "bx-search" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/search", text: "HISTORY", icon: "bx-history" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
  ],
  history: [
    { page: "/", text: "HOME", icon: "bx-home" },
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/search", text: "SEARCH", icon: "bx-search" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
  ],
  search: [
    { page: "/", text: "HOME", icon: "bx-home" },
    { page: "/dashboard", text: "DASHBOARD", icon: "bxs-dashboard" },
    { page: "/sales", text: "SALES", icon: "bx-plus-circle" },
    { page: "/inventory", text: "INVENTORY", icon: "bx-package" },
    { page: "/logout", text: "EXIT", icon: "bx-chevrons-left" },
  ],
};

router.get("/", (req, res) => {
  if (req.session.userId) {
    res.render("pages/home", {
      links: navLinks.home,
      username: req.session.userName,
    });
  } else {
    res.render("pages/index", { links: navLinks.index });
  }
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/signUp", (req, res) => {
  res.render("pages/register");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/search", requireLogin, (req, res) => {
  res.render("pages/search", {
    links: navLinks.search,
  });
});

router.get("/setup", requireLogin, (req, res) => {
  res.render("pages/setup");
});

router.get("/history", requireLogin, (req, res) => {
  res.render("pages/search", {
    links: navLinks.search,
  });
});

router.get("/inventory", requireLogin, (req, res) => {
  res.render("pages/coming-soon");
});

router.get("/dashboard", requireLogin, (req, res) => {
  res.render("pages/coming-soon");
});

router.get("/sales", requireLogin, async (req, res) => {
  try {
    const saleRecords = await salesController.fetchSalesByUserId(
      req.session.businessId
    );

    const formattedSales = saleRecords.map((sale)=>({
      ...sale,
      price: formatPriceAsTZS(sale.price)
    }))
    res.render("pages/sales", {
      links: navLinks.sales,
      username: req.session.userName,
      business: req.session.businessName,
      sales: formattedSales,
    });
  } catch (error) {
    req.flash("error", "An error occurred while fetching sales.");
    res.status(500).redirect("back");
  }
});

// Apply the rate limiter and validation middleware to the /register route
router.post("/register", apiLimiter, async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Check if User exists
  try {
    const existingUser = await usersController.findExistingUser(email);

    if (existingUser) {
      console.log("User with email exists!");
      req.flash("error", "User with this email exists!");
      return res.redirect("back");
    } else {
      console.log("Email available");
      try {
        console.log("creating user");
        const hashedPassword = await PasswordHandler.hashPassword(password);
        const user = await usersController.createUser(
          email,
          name,
          hashedPassword
        );
        req.session.userId = user.id;
        req.session.userName = user.name;
        return res.render("pages/success", {
          status: 200,
          username: req.session.userName,
        });
      } catch (error) {
        console.log("Error creating user", error);
        req.flash("error", "Error creating user");
        return res.redirect("back");
      }
    }
  } catch (error) {
    console.log("couldn't check email availability", error);
    req.flash("error", "Error checking email availability");
    return res.redirect("back");
  }
});

router.post("/login", apiLimiter, async (req, res) => {
  // Proceed with login logic...
  const { email, password } = req.body;
  // login logic here
  // Check if User exists
  try {
    const existingUser = await usersController.findExistingUser(email);
    console.log("checking user existence");
    if (!existingUser) {
      console.log("User with email doesn't exist!");
      req.flash("error", "User with this email doesn't exist!");
      return res.redirect("back");
    } else {
      try {
        const validPassword = await PasswordHandler.comparePassword(
          password,
          existingUser.password
        );
        if (validPassword) {
          console.log("correct password");
          const returnTo = req.session.returnTo || "/"; // Default to homepage if no returnTo is set
          delete req.session.returnTo; // Clear the returnTo from the session
          // get users businesses
          const usersBusiness = await businessController.getBusinessByUserId(
            existingUser.id
          );
          req.session.userName = existingUser.name;
          req.session.userId = existingUser.id;
          req.session.businessId = usersBusiness.id;
          req.session.businessName = usersBusiness.name;
          return res.redirect(returnTo);
        } else {
          console.log("Incorrect Password");
          req.flash("error", "Incorrect Password");
          return res.redirect("back");
        }
      } catch (error) {
        console.log("Error Signing In", error);
        req.flash("error", "Error Signing In!\n Please try again!");
        return res.redirect("back");
      }
    }
  } catch (error) {
    console.log("couldn't check email availability", error);
    req.flash("error", "Error checking email availability");
    return res.redirect("back");
  }
});

router.post("/addSale", requireLogin, apiLimiter, async (req, res) => {
  const { itemName, itemQuantity, itemPrice, saleDate } = req.body;
  const dateTimeString = saleDate + "T21:00:00.000Z";

  const saleDetails = {
    product: itemName.toUpperCase(),
    quantity: parseFloat(itemQuantity),
    price: parseFloat(itemPrice),
    createdAt: dateTimeString,
    businessId: req.session.businessId,
  };

  console.log(saleDetails);
  try {
    console.log("adding sale..");
    const newSale = await salesController.saleEntry(saleDetails);
    req.flash("success", "Sale added successfully");
    console.log("Sale added successfully", newSale.item);
    return res.redirect("/sales");
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Couldn't add sale");
    res.redirect("back");
  }
});

router.post("/deleteSale", requireLogin, apiLimiter, async (req, res) => {
  const productToDelete = req.body.productToDelete;
  const product = productToDelete.toUpperCase();
  const latestSale = await salesController.fetchLatestSale(
    req.session.businessId,
    product
  );

  // Check if a sale was found
  if (latestSale) {
    // Delete the latest sale
    await salesController.saleDeletion(latestSale)
    req.flash("success", "Sale deleted succesfully.");
    return res.redirect("back");
  } else {
    req.flash("error", "No sale found for the given for the provided name.");
    return res.redirect("back");
  }
});

router.post("/search", requireLogin, apiLimiter, async (req, res) => {
  const { saleDate, itemName, minPrice, maxPrice } = req.body;

  if (!saleDate && !itemName && !minPrice && !maxPrice) {
    req.flash("error", "Enter at least one parameter");
    return res.redirect("back");
  } else {
    let filter = {
      businessId: req.session.businessId,
    };

    if (saleDate) {
      // Format the Date object to include the timestamp
      let formattedSaleDate = saleDate + "T21:00:00.000Z";
      filter.createdAt = formattedSaleDate;
    }

    if (itemName) {
      filter.product = itemName.toUpperCase();
    }

    filter.price = {};
    if (minPrice) {
      filter.price.gte = parseFloat(minPrice);
    }

    if (maxPrice) {
      filter.price.lte = parseFloat(maxPrice);
    }

    const filteredSales = await salesController.fetchSalesByFilter(filter);

    if (filteredSales.length > 0) {
      const formattedSales = await filteredSales.map((sale) => ({
        ...sale,
        createdAt: formatDate(sale.createdAt),
        price: formatPriceAsTZS(sale.price),
      }));

      return res.render("pages/history", {
        links: navLinks.history,
        sales: formattedSales,
        saleDate,
        itemName,
        minPrice,
        maxPrice,
        message: null,
      });
    } else {
      return res.render("pages/history", {
        links: navLinks.history,
        message: "Couldn't Find any records to match the filter criteria!",
      });
    }
  }
});

router.post("/saveSetup", requireLogin, apiLimiter, async (req, res) => {
  const { businessName, businessType, businessDescription } = req.body;

  const businessDetails = {
    userId: req.session.userId, // Uncomment and use this line if you have the userId available
    name: businessName,
    type: businessType,
    description: businessDescription,
  };

  const newBusiness = await businessController.createBusiness(businessDetails);
  console.log(newBusiness.name);
  return res.status(200).redirect("/");
});

router.use("*/", (req, res) => {
  res.status(404).render("pages/404");
});

process.on("SIGINT", async () => {
  console.log("Server shutting down...");
  await prisma.$disconnect();
  process.exit();
});

export default router;
