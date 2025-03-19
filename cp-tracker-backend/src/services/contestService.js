const axios = require("axios");

// Fetch Codeforces contests
const fetchCodeforcesContests = async () => {
    try {
        const response = await axios.get("https://codeforces.com/api/contest.list");
        if (response.data.status !== "OK") return [];

        // Filter only upcoming contests
        return response.data.result
            .filter(contest => contest.phase === "BEFORE")
            .map(contest => ({
                name: contest.name,
                platform: "Codeforces",
                url: `https://codeforces.com/contest/${contest.id}`,
                startTime: new Date(contest.startTimeSeconds * 1000),
                duration: contest.durationSeconds / 60,
            }));
    } catch (error) {
        console.error("Error fetching Codeforces contests:", error.message);
        return [];
    }
};

// Fetch LeetCode contests
const fetchLeetCodeContests = async () => {
    try {
        const response = await axios.get("https://leetcode.com/contest/api/info/");
        return response.data.contests.map(contest => ({
            name: contest.title,
            platform: "LeetCode",
            url: `https://leetcode.com/contest/${contest.titleSlug}`,
            startTime: new Date(contest.startTime * 1000),
            duration: contest.duration / 60,
        }));
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error.message);
        return [];
    }
};

// Fetch CodeChef contests
const fetchCodeChefContests = async () => {
    try {
        const response = await axios.get("https://www.kontests.net/api/v1/code_chef");
        return response.data.map(contest => ({
            name: contest.name,
            platform: "CodeChef",
            url: contest.url,
            startTime: new Date(contest.start_time),
            duration: contest.duration,
        }));
    } catch (error) {
        console.error("Error fetching CodeChef contests:", error.message);
        return [];
    }
};

// Fetch all contests
const fetchAllContests = async () => {
    const [cfContests, lcContests, ccContests] = await Promise.all([
        fetchCodeforcesContests(),
        fetchLeetCodeContests(),
        fetchCodeChefContests(),
    ]);

    return [...cfContests, ...lcContests, ...ccContests];
};

module.exports = { fetchAllContests };
