const SocialMedia = artifacts.require("SocialMediaDapp");
module.exports = async function (deployer) {
  await deployer.deploy(SocialMedia);
  const socialMedia = await SocialMedia.deployed();
}