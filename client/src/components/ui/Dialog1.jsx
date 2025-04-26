import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoadUserQuery } from "@/features/api/authApi.js"
import { Loader2 } from "lucide-react"

const DialogDemo = ({updateUserIsLoading,name , onChangeHandler,setName,updateUserHandler} ) => {
  const { isLoading } = useLoadUserQuery();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label >Name</Label>
            <Input type="text" placeholder="Name" className="col-span-3"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label >Profile</Label>
            <Input type="file" accept="image/*" onChange={onChangeHandler} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={updateUserIsLoading} onClick={updateUserHandler} type="submit">
            {
              updateUserIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...
                </>
              ) : "Save Changes"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo;