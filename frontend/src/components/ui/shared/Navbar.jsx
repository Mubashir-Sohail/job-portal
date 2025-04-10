import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-10">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#54CBD0]">Portal</span>
          </h1>
        </div>
        <div className="flex font-medium items-center  gap-5 cursor-pointer ">
          {!user ? (
            <div className="flex item-center gap-2">
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/SignUp">
                <Button className="bg-[#54CBD0] hover:bg-[#46C1C6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex font-medium items-center  gap-5 cursor-pointer">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>Job</div>
              <div>Browse</div>

              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex gap-10 p-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>Pastel Mern-Stack</h4>
                      <p className="text-sm text-muted-foreground">
                        {" "}
                        Lorem is the Pariatur{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 items-start ">
                    <div className="flex">
                      <div className="p-2">
                        <User2 />
                      </div>
                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex">
                      <div className="p-2">
                        <LogOut />
                      </div>

                      <Button variant="link">View Profile</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
