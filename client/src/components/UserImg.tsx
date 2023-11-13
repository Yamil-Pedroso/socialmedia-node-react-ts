import { Box } from '@mui/material';
interface UserImageProps {
  picPath: string | undefined;
  size?: string;
}

const UserImg = ({ picPath, size = "60px" }: UserImageProps) => {
  const imgUrl = `http://localhost:3001/assets/${picPath}`;
  console.log(imgUrl);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${picPath}`}
      />
    </Box>
  );
};

export default UserImg;
