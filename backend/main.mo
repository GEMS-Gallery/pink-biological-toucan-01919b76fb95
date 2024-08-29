import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  // Stable variables
  stable var welcomeMessage : Text = "Welcome to our simple site!";
  stable var aboutInfo : Text = "This is a basic website built on the Internet Computer.";
  stable var items : [Item] = [];

  // Mutable variable
  private var contactSubmissions = HashMap.HashMap<Text, (Text, Text, Text)>(0, Text.equal, Text.hash);

  // Types
  public type Item = {
    id: Nat;
    title: Text;
    description: ?Text;
  };

  // Query functions
  public query func getWelcomeMessage() : async Text {
    welcomeMessage
  };

  public query func getAboutInfo() : async Text {
    aboutInfo
  };

  public query func getItems() : async [Item] {
    items
  };

  // Update functions
  public func submitContactForm(name: Text, email: Text, message: Text) : async Result.Result<Text, Text> {
    let id = Text.concat(name, email);
    contactSubmissions.put(id, (name, email, message));
    #ok("Form submitted successfully")
  };

  // Helper function to add items (for demonstration)
  public func addItem(title: Text, description: ?Text) : async () {
    let newItem : Item = {
      id = items.size();
      title = title;
      description = description;
    };
    items := Array.append(items, [newItem]);
  };
}
