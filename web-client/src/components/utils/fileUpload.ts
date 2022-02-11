import axios from "axios";
import { SERVER_ROOT_URL } from "../../redux/constants/index";

const handleFileUpload = async (
  token: string,
  file: File
): Promise<string | null> => {
  try {
    const {
      data: { url },
    } = await axios({
      method: "get",
      url: `${SERVER_ROOT_URL}/post/image`,
      headers: {
        authorization: token,
      },
    });

    if (!url) {
      // return some errors here
      return null;
    } else {
      console.log("url: " + url);
    }

    await axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: file,
    });
    const imageUrl = url.split("?")[0];
    console.log("imageUrl: " + imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default handleFileUpload;
