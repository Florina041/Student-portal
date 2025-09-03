import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { User } from "./models/User.js";
import { Member } from "./models/Member.js";
import { Society } from "./models/Society.js";
import societiesData from "./data/societies.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Clear old data
    await User.deleteMany({});
    await Member.deleteMany({});
    await Society.deleteMany({});
    console.log("Old data cleared");

    //Create a global Super Admin (not linked to any society)
    const superAdminUser = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: "superpassword123", //will be hashed automatically
    });
    await superAdminUser.save();

    const superAdminMember = new Member({
      name: superAdminUser.name,
      role: "SuperAdmin", // top-level
      society: null, // not tied to any society
    });
    await superAdminMember.save();

    superAdminUser.member = superAdminMember._id;
    await superAdminUser.save();

    console.log("Global Super Admin created (email: superadmin@example.com, password: superpassword123)");

    // Seed societies
    for (const societyData of societiesData) {
      const society = new Society({
        name: societyData.name,
        category: societyData.category,
        description: societyData.description,
        lead: societyData.lead,
      });
      await society.save();

      // At least 1 Admin + 1 Coordinator + Students per society
      const roles = ["Admin", "Coordinator", "Student", "Student", "Student"];
      for (let i = 0; i < roles.length; i++) {
        // Create User
        const user = new User({
          name: `${roles[i]} ${i + 1} of ${society.name}`,
          email: `${roles[i].toLowerCase()}${i + 1}-${society._id}@example.com`,
          password: "password123",
        });
        await user.save();

        // Create Member
        const member = new Member({
          name: user.name,
          role: roles[i],
          society: society._id,
        });
        await member.save();

        // Link User ↔ Member
        user.member = member._id;
        await user.save();

        // Add Member to Society
        society.members.push(member._id);
        society.membersCount++;
      }

      await society.save();
      console.log(`Seeded ${society.name} with ${society.membersCount} members`);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
