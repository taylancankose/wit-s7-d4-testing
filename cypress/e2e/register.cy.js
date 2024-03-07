describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should show error messages", () => {
    cy.get("#name").type("Ta");
    cy.get("#surname").type("ko");
    cy.get("#password").type("taylan123");
    cy.get("#email").type("taylan@gmail");

    cy.contains("Please enter a valid email address");
    cy.contains("Name must be at least 3 characters long");
    cy.contains("Surname must be at least 3 characters long");
    cy.contains(
      "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"
    );

    cy.get("#registerBtn").should("be.disabled");
  });

  it("should not show error messages & should show ID", () => {
    cy.get("#name").type("Taaylan");
    cy.get("#surname").type("kose");
    cy.get("#password").type("Teco351996###");
    cy.get("#email").type("taylancankose@gmail.com");

    cy.get("#registerBtn").should("be.enabled");

    cy.get("#registerBtn").click();
    cy.get("h1").should("contain", "ID: ");
  });
});
