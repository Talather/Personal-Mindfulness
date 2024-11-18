import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./form.module.css"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../firebase"

export default function SignInFormComponent() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm()
  const [state, setState] = useState({})
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    setState({})

    const userCreate = {
      name: formData.name,
      email: formData.email,
      grade: formData.grade,
      schoolName: formData.SchoolName,
      role: "student",
    }
    const user = await createUser({ userCreate })

    if (!user) {
      setState({ success: true })
    } else {
      setState(user)
    }
    navigate(`/video?grade=${formData.grade}&user=${user.id}`)
  }

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      {state?.error && <div className="error">{state.error}</div>}
      <div className={styles.inputWrapper}>
        <Input
          errorMessage={errors.name && "Please enter your Name"}
          isInvalid={!!errors.name}
          label={"Student Name"}
          labelPlacement={"outside"}
          placeholder={"Enter your Name"}
          radius={"sm"}
          {...register("name", { required: true })}
          type={"text"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          errorMessage={errors.email && "Please enter your Email"}
          isInvalid={!!errors.email}
          label={"Student Email"}
          labelPlacement={"outside"}
          placeholder={"Enter your Email"}
          radius={"sm"}
          {...register("email", { required: true })}
          type={"text"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          //   endContent={<img alt={'email icon'} height={20} radius={'none'} src={'/icons/password.svg'} width={20} />}
          errorMessage={errors.grade && "Please enter your Grade"}
          isInvalid={!!errors.grade}
          label={"Student Grade"}
          labelPlacement={"outside"}
          placeholder={"Enter your Grade"}
          radius={"sm"}
          {...register("grade", { required: true })}
          type={"number"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          //   endContent={<img alt={'email icon'} height={20} radius={'none'} src={'/icons/password.svg'} width={20} />}
          errorMessage={errors.SchoolName && "Please enter your School Name"}
          isInvalid={!!errors.SchoolName}
          label={"Student School Name"}
          labelPlacement={"outside"}
          placeholder={"Enter your School Name"}
          radius={"sm"}
          {...register("SchoolName", { required: true })}
          type={"text"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.signInOptions}></div>
      <div className={styles.signInButtonWrapper}>
        <Button
          className={styles.signInButton}
          color={"primary"}
          isDisabled={!!state.success}
          isLoading={isSubmitting}
          radius={"sm"}
          type={"submit"}
          onClick={() => {}}
        >
          Proceed To Video
        </Button>
      </div>
    </form>
  )
}
