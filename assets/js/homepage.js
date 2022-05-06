var getUserRepos = function () {
    fetchfetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();
